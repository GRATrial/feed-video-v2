/**
 * Vercel Serverless Function - Log Event
 * POST /api/log
 * Captures pid, IP address, condition, eventType, and extra data
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is required');
}

const DB_NAME = 'instagram_study';
const COLLECTION_NAME = 'ad_interactions';

// Cache MongoDB connection for serverless
let cachedClient = null;
let cachedDb = null;

async function getDatabase() {
    if (cachedClient && cachedDb) {
        try {
            await cachedClient.db('admin').command({ ping: 1 });
            return cachedDb;
        } catch (error) {
            cachedClient = null;
            cachedDb = null;
        }
    }

    const client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
    });

    await client.connect();
    const db = client.db(DB_NAME);
    
    cachedClient = client;
    cachedDb = db;
    
    return db;
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            ok: false,
            error: 'Method not allowed'
        });
    }

    try {
        // Get client IP (via Vercel)
        const forwardedFor = req.headers['x-forwarded-for'] || '';
        const ip = forwardedFor.split(',')[0].trim() || req.connection?.remoteAddress || 'unknown';

        // Parse request body
        const body = req.body || {};
        const { pid, condition, eventType, extra } = body;

        // Validate required fields
        if (!pid) {
            return res.status(400).json({
                ok: false,
                error: 'pid is required'
            });
        }

        if (!condition) {
            return res.status(400).json({
                ok: false,
                error: 'condition is required'
            });
        }

        if (!eventType) {
            return res.status(400).json({
                ok: false,
                error: 'eventType is required'
            });
        }

        // Get database and collection
        const db = await getDatabase();
        const collection = db.collection(COLLECTION_NAME);

        // Create log document
        const logDocument = {
            pid: pid,
            ip: ip,
            condition: condition,
            event_type: eventType,
            extra: extra || {},
            created_at: new Date(),
            timestamp: new Date().toISOString(),
            user_agent: req.headers['user-agent'] || null
        };

        // Insert into database
        const result = await collection.insertOne(logDocument);

        console.log('LOG_EVENT', {
            pid,
            condition,
            eventType,
            ip,
            extra,
            timestamp: new Date().toISOString(),
            id: result.insertedId
        });

        return res.status(200).json({
            ok: true,
            id: result.insertedId
        });

    } catch (error) {
        console.error('❌ Error logging event:', error);
        return res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};

