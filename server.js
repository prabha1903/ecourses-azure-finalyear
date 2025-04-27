require('dotenv').config();
const express = require('express');
const { TableClient } = require('@azure/data-tables');

const app = express();
const port = process.env.PORT || 3000;

// Azure Table Storage Setup
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const tableClient = TableClient.fromConnectionString(connectionString, "courses");

// Middleware
app.use(express.static('public'));
app.use(express.json());

// API Endpoint
app.get('/api/courses', async (req, res) => {
    try {
        const courses = [];
        const entities = tableClient.listEntities();
        
        for await (const entity of entities) {
            courses.push({
                id: entity.rowKey,
                title: entity.title,
                description: entity.description,
                category: entity.category,
                price: entity.price,
                image: entity.imageUrl,
                instructor: entity.instructor,
                rating: entity.rating,
                duration: entity.duration
            });
        }
        
        // Mock data if Azure table is empty (for demo)
        if (courses.length === 0) {
            courses.push(...require('./mock-courses.json'));
        }
        
        res.json(courses);
    } catch (error) {
        console.error('Azure Storage error:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});