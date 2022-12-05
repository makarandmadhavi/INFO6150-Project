import { Box } from "@mui/system"
import { Typography } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';

function AdminDash(){
    return(
        <Box m="100px">
            <Box dsiplay="flex" justifyContent="space-between">
                <Typography variant="h4" color="#222" fontWeight="bold" sx={{mb: "5px", mr: 150}}>DASHBOARD</Typography>
                <Typography variant="h6" color="#DC143C" sx={{mr: 167}}>Welcome</Typography>
            </Box>
            <Box mt="10px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                gridColumn="span 3"
                backgroundColor="indigo"
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                    <Box width="100%" m="0 30px">
                        <Box display="flex" justifyContent="space-between">
                            <Box>
                                <GroupIcon sx={{color: "#DC143C"}} />
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    sx={{ color: "#000" }}
                                >
                                    Users
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt="2px">
                        <Typography variant="h6" sx={{ color: "#DC143C" }}>
                            subtitle
                        </Typography>
                        <Typography
                            variant="h5"
                            fontStyle="italic"
                            sx={{ color: "#000" }}
                        >
                            increase
                        </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
       
    )
}

export default AdminDash