import { useState } from "react";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl, FormLabel
} from "@mui/material";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Dropzone from "react-dropzone";


const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [ value, setValue ] = useState("")

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  return (
    <>
        <form >
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, color: "black"
            }}
          >
            {isLogin && (
              <>
              <TextField
              label="Email"
              variant="standard"
              name="email"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              name="password"
              sx={{ gridColumn: "span 4" }}
            />
            <Button
              fullWidth
              type="submit"
              sx={{
                width: 420,
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#DC143C",
                color: "black",
                "&:hover": { color: "white", backgroundColor: "#8B0000"},
              }}
            > LOGIN
            </Button>
              </>
            )}
            

            {isRegister && (
              <>
                
                <TextField
                  label="First Name"
                  variant="standard"
                  name="firstName"
                 
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                
                  variant="standard"
                  
          
                  name="lastName"
                  
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
              label="Email"
            
              variant="standard"
   
              name="email"
        
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              
              variant="standard"
           
            
              name="password"
      
              sx={{ gridColumn: "span 4" }}
            />
                <TextField
                  label="NUID"
             
                  variant="standard"
                  name="nuid"
                  sx={{ gridColumn: "span 4" }}
                />
                <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup row>
                <FormControlLabel value="female" control={<Radio />} label="Student" />
                <FormControlLabel value="male" control={<Radio />} label="Alumini" />
                
              </RadioGroup>
              </FormControl>
                
                <Box
                  gridColumn="span 4"
                  border={`1px solid #222`}
                  borderRadius="5px"
                  p="1rem"
                  sx={{color: "black"}}
                >
                  <Dropzone
                    acceptedFiles="image/*"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setValue(acceptedFiles[0])
                    }
                    
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed #DC143C`}
                        p="1rem"
                        textAlign="center"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        
                        <input {...getInputProps()} />
                        <ArrowCircleUpIcon />
                          {!value.name ? (
                            <p style={{textAlign: "center", margin: "5px"}}>Add Picture Here</p>
                          ) : (
                            <Typography sx={{textAlign: "center"}}>{value.name}</Typography>
                            
                          )}
                          
                               
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <Button
                  type="submit"
                  sx={{
                    width: 420,
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: "#DC143C",
                    color: "black",
                    "&:hover": { color: "white", backgroundColor: "#8B0000"},
                  }}
                > REGISTER
                </Button>
              </>
            )}

            

            
          </Box>

          {/* BUTTONS */}
          <Box>
            {/* <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#DC143C",
                color: "black",
                "&:hover": { color: "white", backgroundColor: "#8B0000"},
              }}
            > {isLogin ? "LOGIN" : "REGISTER"}
            </Button> */}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
              }}
              sx={{
                textDecoration: "underline",
                color: "#1E90FF",
                "&:hover": {
                  cursor: "pointer",
                  color: "#00BFFF",
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
    </>
  );
};

export default Form;
