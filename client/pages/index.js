import axios from "axios";

const LandingPage = ({ currentuser }) => {
  return currentuser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async ({ req }) => {
  console.log("I am on client");

  try {
    const { data } = await axios.get(
      "https://localhost:3000/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default LandingPage;
