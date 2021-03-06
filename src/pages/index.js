import React ,{ useEffect , useState } from "react";
import {Provider} from "react-redux";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 

import Layout from "../components/layout";
//import Image from "../components/image"
import SEO from "../components/seo";
import { store } from "../store" ;
import { isMobile, isBrowser , browserName } from 'react-device-detect';

const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#fff',
        main: '#233B58', // application Primary color
        dark: '#000',
     },
     secondary: {
       main: '#4FB218', // application Secondary color
     },
     common :{
         white :'#fff',
     },
     button :{
        white :'#fff',
     },
     text: {
        primary: "#000000", //text primary color
        secondary: "#ffffff", //text secondary color
        highlight : "#3993CE", // highlight text color 
        variant1 :"#45B6FA" , // blue
        variant2 :'rgba(0, 0, 0, 0.5)' , // grey
        variant3 :'rgba(0, 0, 0, 0.2)' , // grey
    },
    icons :{
        primary : "#ffffff",
        secondary: "#000000",
        variant1 :"#3993CE" , // blue
    },
    background: {
        default: "#ffffff"
    },
    loader : {
        main: "#45B6FA"
    }
  },
  typography: { 
     useNextVariants: true
  }
});

const IndexPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    console.log("isMobile...")
      console.log(isMobile)
      console.log("isBrowser...")
      console.log(isBrowser)
      console.log('******browserName***********', browserName);
    window.addEventListener('beforeinstallprompt', function (event) {
      event.preventDefault();
      setDeferredPrompt(event);
    });
  }, []);
  const installApp = () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setDeferredPrompt(null);
    });
  };
  return (
    <Provider store={ store }>
      <Layout>
        <SEO title="Home" />
        <MuiThemeProvider theme = { theme }>
        <h1>UI-Admin Notification Report Landing Page</h1>
        <button onClick={installApp}>Install App</button>
        </MuiThemeProvider> 
        
      </Layout>
    </Provider>
    
  )
}


export default IndexPage
