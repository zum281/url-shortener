import Alert from "@material-ui/lab/Alert";
const ErrorMsg = ({ text }) => {
    return <Alert severity="error">{text}</Alert>;
};

export default ErrorMsg;
