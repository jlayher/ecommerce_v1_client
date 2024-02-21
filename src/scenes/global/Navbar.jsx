import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Badge, Box, IconButton } from "@mui/material"
import { PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined } from "@mui/icons-material"
import { useNavigate } from "react-router-dom" //go to different URLS
import {shades} from "../../theme"

//redux 
import { setIsCartOpen } from "../../state"

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // this is grabbing the cart ARRAY from our cartSlice named "cart".  state(redux).cart(name of cartslice).cart(cart array)
  const cart = useSelector((state) => state.cart.cart)

  return (
    // Material UI: You can pass in CSS properties directly into the Box component specifically
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          // like Link or <a> and href
          onClick={() => navigate("/")}
          // you have to use sx for psuedo selectors
          sx={{ '&:hover': { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          ECOMMER
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          {/* because this is not a Box component, "sx" is used to set CSS props */}
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <PersonOutline />
          </IconButton>

          <Badge
            badgeContent={cart.length}
            color='secondary'
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              }
            }}
          >
            <IconButton
              // setIsCartOpen doesn't have an action, so we set the payload to an empty object.  
              // updates our isCartOpen state.  Toggles T/F.  
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}>
              <ShoppingBagOutlined />
              </IconButton>
          </Badge>

          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
        
      </Box>
    </Box>
  )
}

export default Navbar