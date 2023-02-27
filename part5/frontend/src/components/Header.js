import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';

const Header = () => {
  return (
    <>
      <Typography
        component="h1"
        level="inherit"
        fontSize="3em"
        mb="0.25em"
      >
        To-Do App
      </Typography>
      <Divider />
    </>
  )
}

export default Header