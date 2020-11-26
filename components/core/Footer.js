import { Button, Container, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import Link from '../../src/Link'

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.common.white,
    width: "100%",
    color: "white",
    borderRadius: 0,
    padding: theme.spacing(2, 0),
  }
}));

export default function Footer() {
  const classes = useStyles()
  return (
    <>
      <Paper className={classes.paper}>
        <Container>
          <Link href="/">
            <span style={{color: '#000'}}>
              &copy; { new Date().getFullYear() } FX-CART
            </span>
          </Link>
        </Container>
      </Paper>
    </>
  )
}