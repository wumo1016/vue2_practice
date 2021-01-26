import axios from './request'

export const fecthSlides = () => axios.get('/api/slider')
