import jwt from 'jsonwebtoken';

export const generateToken= async (user, time) => {
  try {
    const token=  jwt.sign({
      _id: user._id,
      email: user.email,
      role:  user.role,
    },
    process.env.JWT_SECRET, 
    {
      expiresIn: time
    }
  )

  return token
  } catch (error) {
    console.log(error)
  }
}