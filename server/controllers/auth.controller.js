import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
export const signup = async (req, res) => {

    const { username, email, password } = req.body;
    const hashPassword = await bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashPassword });
    const salt = await bcryptjs.genSalt(10);
  
    console.log(newUser);
  
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}