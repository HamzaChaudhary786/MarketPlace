export const test=(req, res)=>{

    res.status(200).json({message: 'Api Route is Working!'});

    console.log('Server is running on port 5000');
}