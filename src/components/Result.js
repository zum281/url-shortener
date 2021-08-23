import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Typography,
    Paper,
    IconButton,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DoneIcon from "@material-ui/icons/Done";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState, useEffect } from "react";

const Result = ({ url }) => {
    const classes = useStyles();
    const [copied, setCopied] = useState(false);
    const handleCopied = () => {
        if (!copied) setCopied(true);
    };
    useEffect(() => {
        setCopied(false);
    }, [url]);

    return (
        <Paper className={classes.root}>
            <Typography>{url}</Typography>
            <CopyToClipboard text={url} onCopy={handleCopied}>
                <IconButton
                    aria-label="copy"
                    size="small"
                    color={copied ? "secondary" : "primary"}
                    className={classes.iconBtn}
                    disabled={copied}
                >
                    {!copied && <FileCopyIcon fontSize="inherit" />}
                    {copied && <DoneIcon fontSize="inherit" />}
                </IconButton>
            </CopyToClipboard>
        </Paper>
    );
};

export default Result;

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    iconBtn: {
        marginLeft: theme.spacing(1),
    },
}));
