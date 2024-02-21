
// Material UI imports
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";

//  Redux Imports
import { useSelector, useDispatch } from "react-redux";

//icons
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove"

import styled from "@emotion/styled";

import { shades } from "../../theme";

//redux imports
import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen,
} from '../../state';

import { useNavigate } from "react-router-dom";

//styled component
const FlexBox = styled(Box)`
    display: flex;
    jusitfy-content: space-between;
    align-items: center;
`;

const CartMenu = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // select redux state
    const cart = useSelector((state) => state.cart.cart)
    const isCartOpen = useSelector((state) => state.cart.isCartOpen)

    // calculate total price of items in cart
    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0)

    return (
        //   hide box if isCartOpen is false.  overlay entire page with opacity to the non-cart section.
        // Overlay
      <Box
          display={isCartOpen ? "block" : "none"}  
          backgroundColor="rgba(0, 0, 0, 0.4)"
          position="fixed"
          zIndex={10}
          width="100%"
          height="100%"
          left="0"
          top="0"
          overflow="auto"
        >
            {/* Modal Cart */}
            <Box
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor="white"
            >
                {/* Inside Modal */}
                <Box padding="30px" overflow="auto" height="100%">
                    {/* Header */}
                    <FlexBox mb="15px">
                        <Typography varient="h3">SHOPPING BAG ({cart.length})</Typography>
                        {/* Close the Cart Modal and Overlay*/}
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>

                    {/* CART LIST */}
                    <Box

                    >
                        {cart.map((item) => (
                            /* item.attributes.name is coming from stapi api.   */
                            <Box key={`${item.attributes.name}-${item.id}`}>
                                <FlexBox p="15px 0">
                                    
                                    {/* Item Image */}
                                    <Box flex="1 1 40%">
                                        <img
                                            // the ? means, if the name exists, set the name.  otherwise undefined
                                            alt={item?.name}
                                            width="123px"
                                            height="164px"
                                            // "http:localhost:1337 is the backend url, where strapi is located.  The rest is attributes. This is how strapi formats its objects"
                                            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                        />
                                    </Box>
                                    {/* Item Name */}
                                    <Box flex="1 1 60%">

                                        <FlexBox mb="5px">
                                            <Typography fontWeight="bold">
                                                {item.attributes.name}
                                            </Typography>
                                            {/* remove item from cart with filter function. LOOK OVER THIS.  NOT SURE ABOUT "id: item:id" SYNTAX*/}
                                            <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                                <CloseIcon />
                                            </IconButton>
                                        </FlexBox>
                                    </Box>
                                </FlexBox>
                                
                                {/* Short Description */}
                                <Typography>{item.attributes.shortDescription}</Typography>

                                {/* Amount */}
                                <FlexBox m="15px 0">
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        border={`1.5px solid ${shades.neutral[500]}`}
                                    >
                                        {/* Remove Button */}
                                        <IconButton
                                            onClick={() => dispatch(decreaseCount({ id: item.id }))}
                                        >
                                            <RemoveIcon />
                                        </IconButton>

                                        {/* Item Count */}
                                        <Typography>{item.count}</Typography>

                                        {/* Add Button*/}
                                        <IconButton
                                            onClick={() => dispatch(increaseCount({ id: item.id }))}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                    {/* Price */}
                                    <Typography fontWeight="bold">${item.attributes.price}</Typography>
                                </FlexBox>
                                <Divider />
                            </Box>
                        ))}
                    </Box>

                    {/* ACTIONS (Subtotal, Price, Checkout*/}
                    <Box m="20px 0" >
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">SUBTOTAL</Typography>
                            <Typography fontWeight="bold">${totalPrice}</Typography>
                        </FlexBox>
                        <Button
                            sx={{
                                backgroundColor: shades.primary[400],
                                color: "white",
                                borderRadius: 0,
                                minWidth: "100%",
                                padding: "20px 40px",
                                m: "20px 0"
                            }}
                            // Go to the Checkout Page AND Close the Cart Menu
                            onClick={() => {
                                navigate("/checkout")
                                dispatch(setIsCartOpen({}));
                            }}
                        >CHECKOUT</Button>
                    </Box>

                </Box>
            </Box>
          
    </Box>
  )
}

export default CartMenu