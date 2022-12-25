import React from 'react'
import axios from 'axios'

export const getAllStudents = async () => {
    try {
        const res = await axios.get('/students');
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
