import axios from 'axios';

// const baseURL = 'http://13.232.82.119:8001/';
// const baseURL="http://192.168.7.213:5000/" // office
// const baseURL="https://la-maison.clickysoft.net/api" // home
//const baseURL="http://192.168.43.96:5000/" // home
const baseURL = 'https://la-maison-api.com/api'; // home

// const baseURL='https://ptdev.herokuapp.com/'
export const addressLocationKey='AIzaSyDxdcou93APcIivhgYHf8zdtnsjLBt8Ud4'
export const imgURL="https://ptdevbucket.s3.us-east-2.amazonaws.com/";

export const url = {

  signup: 'auth/register',
  login: 'auth/login',
  logout: 'auth/logout',
  
};

export const httpRequest = axios.create({baseURL: baseURL});
