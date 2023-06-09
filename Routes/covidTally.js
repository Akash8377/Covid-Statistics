const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const { connection } = require('../connector')

router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

//  ------------ Default route ------------
router.get('/', (req, res) => {

    res.send("working")
})

// ------------------ Total Recovered --------------------------
router.get('/totalRecovered', async (req, res) => {

    try {
        const data = await connection.find();
        let total = 0;
        for (i = 0; i < data.length; i++) {
            total += data[i].recovered
        }
        res.status(200).json({
            data: { _id: "total", recovered: total },

        })
    } catch (error) {
        res.status(500).json({
            sta: "failed",
            message: error.message
        })
    }

})

//==============Total active  =============


router.get('/totalActive', async (req, res) => {

    try {
        const data = await connection.find();
        let totalRecovered = 0;
        let totalInfected = 0;
        for (i = 0; i < data.length; i++) {
            totalRecovered += data[i].recovered
            totalInfected += data[i].infected
        }
        const active = totalInfected - totalRecovered
        res.status(200).json({
            data: { _id: "total", active },

        })
    } catch (error) {
        res.status(500).json({
            sta: "failed",
            message: error.message
        })
    }

})

//=================Total Death ===================
router.get('/totalDeath', async (req, res) => {

    try {
        const data = await connection.find();
        let death = 0;
        for (i = 0; i < data.length; i++) {
            death += data[i].death
        }
        res.status(200).json({
            data: { _id: "total", death },

        })
    } catch (error) {
        res.status(500).json({
            sta: "failed",
            message: error.message
        })
    }

})
//===============hotspot-States ================

router.get('/hotspotStates', async (req, res) => {

    try {
        const covidData = await connection.find();
        let recovered = 0;
        let infected = 0;
        const data = []
        for (i = 0; i < covidData.length; i++) {
            recovered = covidData[i].recovered
            infected = covidData[i].infected
            rateValue = ((infected - recovered) / infected)

            if (rateValue > (0.1)) {
                rateValue = rateValue.toFixed(5);
        
                data.push({ state: covidData[i].state, rate: rateValue });
            }
        }

        res.status(200).json({
            data

        })
    } catch (error) {
        res.status(500).json({
            sta: "failed",
            message: error.message
        })
    }

})

//=======================mortality rate ================


router.get('/healthyStates', async (req, res) => {

    try {
        const covidData = await connection.find();
        let death = 0;
        let infected = 0;
        const data = []
        for (i = 0; i < covidData.length; i++) {
            death = covidData[i].death
            infected = covidData[i].infected
            rateValue = (death/infected) ;
            if (rateValue < 0.005) {
                rateValue = rateValue.toFixed(5)
                data.push({ state: covidData[i].state, mortality: rateValue });
            }
        }

        res.status(200).json({
            data

        })
    } catch (error) {
        res.status(500).json({
            sta: "failed",
            message: error.message
        })
    }

})

module.exports = router;