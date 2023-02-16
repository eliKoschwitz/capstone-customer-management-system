import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CustomFile from "../types/file";
import {IconButton, Skeleton} from "@mui/material";
import {PhotoCamera as PhotoCameraIcon} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {ThemeConfig} from "../config/Theme";

export default function OrderImgCard({fileId, onUpload, onUpload2}: {
    fileId?: string,
    onUpload: (file: CustomFile) => void,
    onUpload2: Function
}) {

    const boxSx = {
        "&:hover": {
            border: "3px solid gray",
            borderRadius: "5",
            width: 500,
            height: 500,
            position: "absolute",
            boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
            objectFit: "cover",
            transition: "all .4s ease-out",
            easeOut: ".4s easeOut",
            zIndex: 3
        },
    }

    const [fileInput, setFileInput] = useState<File>();

    const [customFile, setCustomFile] = useState<CustomFile | null>(null);

    const [imgPreview, setImgPreview] = React.useState<string | null>(null);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [headline, setHeadline] = React.useState<string>("");

    useEffect(() => {
        if (fileId) {
            (async () => {
                try {
                    console.log(fileId);
                    const response = await axios.get("/api/files/" + fileId + "/metadata");
                    setCustomFile(response.data);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [fileId]);

    const postInputFile = async () => {
        if (fileInput) {
            const formData = new FormData();
            formData.append("file", fileInput);
            formData.append("headline", headline);

            const response = await axios.post("/api/files", formData);
            onUpload(response.data);
            setCustomFile(response.data)
            onUpload2();

            if (!customFile) {
                return null;
            }
            onUpload(customFile);
            alert(JSON.stringify(response.data, null, 2));
        } else {
            console.log("kein customFile gefunden");
        }
    };

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setHeadline(value);

            console.log("handleChange-value ", value);
        }, [setHeadline]);

    //preview
    useEffect(() => {
        // PREVIEW
        if (fileInput) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result as string); // die url des bildes
            };
            reader.readAsDataURL(fileInput);
            console.log("ein File wurde hochgeladen");
        } else {
            setImgPreview(null);
            console.log("ein File wurde nicht hochgeladen");
        }
    }, [fileInput]);

    return (
        <>
            <input
                required
                ref={fileInputRef}
                style={{display: "none"}}
                type={"file"}

                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (!event.target.files || event.target.files[0] === null) {
                        setCustomFile(null)
                        return;
                    }
                    setFileInput(event.target.files[0]);
                }}
                accept={"image/*"}
            />

            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Box style={{position: "absolute"}}>
                    {(customFile) ?
                        (
                            <Box width={250} height={320} display={"flex"} justifyContent={"center"}
                                 alignItems={"center"}
                                 style={{
                                     position: "relative",
                                     border: "2px solid gray",
                                     borderRadius: 5,
                                     overflow: "hidden",
                                     boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) " +
                                         "0px 30px 60px -30px, rgba(10, 37, 64, 0.35)" +
                                         " 0px -2px 6px 0px inset"
                                 }}
                                 sx={boxSx}>
                                <img src={"/api/files/" + customFile.id} alt="preview"
                                     style={{
                                         objectFit: "cover", width: "100%", height: "100%", position: "absolute",
                                         backgroundColor: "rgb(255, 255, 255)"
                                     }}/>
                            </Box>)
                        : (imgPreview) ?
                            (
                                <Box width={250} height={320} display={"flex"} justifyContent={"center"}
                                     alignItems={"center"}
                                     style={{
                                         position: "relative",
                                         border: "2px solid black",
                                         borderRadius: 5,
                                         overflow: "hidden",
                                         boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) " +
                                             "0px 30px 60px -30px, rgba(10, 37, 64, 0.35)" +
                                             " 0px -2px 6px 0px inset"
                                     }}
                                     sx={boxSx}>
                                    <img src={imgPreview} alt={"preview"}
                                         style={{
                                             objectFit: "cover", width: "100%", height: "100%", position: "absolute",
                                             backgroundColor: "rgb(255, 255, 255)"
                                         }}/>
                                </Box>)
                        :
                        (<>
                            <Box width={250} height={320} display={"flex"} justifyContent={"center"}
                                 alignItems={"center"}
                                 style={{position: "relative"}} >

                                <Skeleton variant="rectangular" animation={"wave"} width={"100%"} height={"100%"}
                                          style={{
                                              position: "absolute",
                                              border: "1px solid black",
                                              borderRadius: 5,
                                              overflow: "hidden",
                                              backgroundColor: "rgb(173, 216, 230)",
                                              boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) " +
                                                  "0px 30px 60px -30px, rgba(10, 37, 64, 0.35)" +
                                                  " 0px -2px 6px 0px inset"
                                          }}/>

                                <IconButton size="large" aria-label="upload image" component="label"
                                            onClick={() => {
                                                fileInputRef.current?.click()
                                            }}
                                            sx={{zIndex: 2, width: "32%", height: "25%", postion: "relativ"}}>
                                    <PhotoCameraIcon sx={{width: "100%", height: "100%", color: "white"}}/>
                                </IconButton>
                            </Box>
                        </>)
                    }
                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} width={215}
                     style={{
                         marginTop: 327, position: "relative", borderRadius: 5,
                         overflow: "hidden", backgroundColor: "rgb(255, 255, 255)"
                     }}>
                    <TextField
                        required
                        label={(!customFile) && ("HeadLine")}
                        onChange={handleChange}
                        variant="standard"
                        inputProps={{style: {textAlign: 'center'}}}
                        margin={"none"}
                        value={(customFile) && customFile.headline}
                        sx={{
                            width: 200,
                            "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {marginTop: 0},
                            "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {marginTop: -2},
                            postion: "relativ"
                        }}
                    />
                    {(customFile) ?
                        <Button onClick={() => {
                            fileInputRef.current?.click()
                        }}>Edit File</Button>
                        :
                        <Button onClick={postInputFile}>Save File</Button>
                    }
                </Box>
            </Box>
            <ThemeConfig>
                <></>
            </ThemeConfig>
        </>
    );
}