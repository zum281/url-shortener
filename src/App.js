import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import { addProtocol } from "./utils";
import Result from "./components/Result";
import ErrorMsg from "./components/Error";

function App() {
    const TOKEN = "57395d4628d93692eaa6c2957fa3438e4ec88993";

    const classes = useStyles();
    const [url, setUrl] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleClick = () => {
        setError(false);
        if (url) {
            setLoading(true);
            let myUrl = addProtocol(url);
            fetch("https://api-ssl.bitly.com/v4/shorten", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    long_url: myUrl,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        setError("invalid url, please try again");
                        setLoading(false);
                    }

                    return res.json();
                })
                .then((data) => {
                    setResult(data.link);
                    setUrl("");
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    setError("Sorry! Something went wrong...");
                    console.log(err);
                });
        }
    };

    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h1" color="textPrimary">
                URLShort
            </Typography>
            <Typography variant="caption" color="textSecondary" gutterBottom>
                just another url shortener
            </Typography>

            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <TextField
                        size="small"
                        variant="outlined"
                        label="link"
                        value={url}
                        style={{
                            background: "#fff",
                        }}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleClick}
                        disabled={url === ""}
                    >
                        shorten
                    </Button>
                </div>
            </div>
            <div className={classes.bottom}>
                {loading && (
                    <div className="loading">
                        <CircularProgress />
                    </div>
                )}
                {result && (
                    <div className="result">
                        <Typography
                            align="center"
                            variant="subtitle2"
                            gutterBottom
                        >
                            Here is your result!
                        </Typography>
                        <Result url={result} />
                    </div>
                )}
                {error && (
                    <div className={classes.error}>
                        <ErrorMsg text={error} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: theme.spacing(10),
        margin: "0 auto",
    },
    formContainer: {
        display: "grid",
        placeItems: "center",
        width: "100vw",
        backgroundColor: "#eceff1",
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
        },
    },
    bottom: {
        marginTop: theme.spacing(10),
    },
    error: {
        marginTop: theme.spacing(-9),
    },
}));
