import useRequest from "../../hooks/use-request";

export default () => {
  const { doRequest } = useRequest({
    url: "http://localhost:3001/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      Router.push("/");
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <h1>Signing you out...</h1>;
};
