import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  // @material-ui uses themes to scale the app based on the device; this means don't apply unless on a small device i.e., iphone
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection:"column-reverse"
    }
  }
}));
