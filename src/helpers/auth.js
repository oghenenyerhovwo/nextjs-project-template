import jwt from 'jsonwebtoken';

export const generateToken= async (user, time) => {
  try {
    const token=  jwt.sign({
      _id: user._id,
      email: user.email,
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

export const getUserDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken._id;
    } catch (error) {
        throw new Error(error.message);
    }
}