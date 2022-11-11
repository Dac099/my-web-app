import { getAllTasks, getUserById } from './fetch-data.js';

const url = 'https://jsonplaceholder.typicode.com/';
const randomUser = Math.floor(Math.random() * 10) + 1;

//Elements for card profile
const profile_username = document.getElementById('profile_username');
const profile_email = document.getElementById('profile_email');
const profile_phone = document.getElementById('profile_phone');
const profile_website = document.getElementById('profile_website');
const profile_id = document.getElementById('profile_id');
