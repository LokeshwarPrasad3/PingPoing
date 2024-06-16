import { Button, Box } from "@mui/material";

const TestUserButtons = ({ setPassword, setEmail }) => {
  return (
    <>
      {/* UI for test credentials */}
      <center>
        <b style={{ opacity: "0.7" }}>USE TEST CREDENTIALS</b>
      </center>
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        <Button
          onClick={() => {
            setEmail("user@gmail.com");
            setPassword("12345");
          }}
          variant="contained"
          color="primary"
        >
          User - 1
        </Button>
        <Button
          onClick={() => {
            setEmail("test@gmail.com");
            setPassword("12345");
          }}
          variant="contained"
          color="secondary"
        >
          User - 2
        </Button>
      </Box>
    </>
  );
};

export default TestUserButtons;
