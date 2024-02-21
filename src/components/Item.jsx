import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material"; 
import AddIcon from "@mui/material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";


// item comes from the backend
const Item = ({ item, width }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //local state to add to the cart
    const [count, setCount] = useState(1);

    //user is hovering over item
    const [isHovered, setIsHovered] = useState(false);

    // getting a color palette from material UI theme.js
    const { palette: { neutral } } = useTheme();

    //destructure from item.attributes
    const { category, price, name, image } = item.attributes;
    
    // This is Strapi specific.  Grab the medium sized image url
    const {
        data: {
            attributes: {
                formats: {
                    medium: { url },
                }
            }
        }
    } = image;

  return (
    <Box width={width}>
        <Box position="relative" onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
            <img 
                alt={item.name}
                width="300px"
                height="400px"
                // get Image from server
                src={`http://localhost:1337${url}`}
                // Go to the Item Details Page
                  onClick={() => navigate(`/item/${item.id}`)}
                //   standard inline styles because this isn't MUI
                  style={{ cursor: 'pointer'}}
              />
              <Box
                  display={isHovered ? "block" : "none"}
                  position="absolute"
                  bottom="10%"
                  left="0"
                  width="100%"
                  padding="0 5%"
              >
                  <Box display="flex" justifyContent="space-between">
                    {/* Amount */}
                    <Box
                        display="flex"
                        alignItems="center"
                        backgroundColor={shades.neutral[100]}
                        borderRadius="3px"
                    >
                          <IconButton
                            //   shorthand to make sure count doesn't go below 1
                            onClick={() => setCount(Math.max(count -1, 1))}
                        >
                            <RemoveIcon />
                        </IconButton>

                        {/* Item Count */}
                        <Typography color={shades.primary[300]}>{count}</Typography>

                        {/* Add Button*/}
                        <IconButton
                            onClick={() => setCount(count + 1)}
                        >
                            <AddIcon />
                        </IconButton>  
                    </Box>
                      
                    {/* Button */}
                      <Button
                        //   return to this line.  Syntax
                          onClick={() => { dispatch(addToCart({ item: { ...item, count } })) }}
                          sx = {{ bagroundColor: shades.primary[300], color: "white"}}
                      >
                          Add to Cart
                        </Button>
                  </Box>
                  
              </Box>
              
          </Box>
          
          <Box mt="3px">
              <Typography variant="subtitle2" color={neutral.dark}>
                  {/* REVIEW THIS REGEX AND REPLACEMENT.  Replacing and capitalizing first letter? */}
                  {category
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
              </Typography>
              <Typography>
                  {name}
              </Typography>
              <Typography fontWeight="bold">${price}</Typography>
          </Box>
    </Box>
  )
}

export default Item