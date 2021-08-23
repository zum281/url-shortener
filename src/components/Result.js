import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography, Paper } from "@material-ui/core";

const Result = ({ url }) => {
    return (
        <Paper>
            <Typography>{url}</Typography>
        </Paper>
    );
};

export default Result;
