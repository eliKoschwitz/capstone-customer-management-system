import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CustomFile from "../types/file";
import {Container, IconButton, Skeleton, Stack} from "@mui/material";
import {PhotoCamera as PhotoCameraIcon} from "@mui/icons-material";
import TextField from "@mui/material/TextField";

export default function OrderImgCardTestZwei({fileId, onUpload, onUpload2}: {
    fileId?: string,
    onUpload: (file: CustomFile) => void,
    onUpload2: Function
}) {
    // für das input file
    const [fileInput, setFileInput] = useState<File | null>(null);
    const [file, setFile] = useState<CustomFile | null>();

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [headline, setHeadline] = React.useState<string>("");

    // Um die karten da zustellen die es schon gibt.
    useEffect(() => {
        if (fileId) {
            (async () => {
                try {
                    console.log(fileId);
                    const response = await axios.get("/api/files/" + fileId + "/metadata");
                    setFile(response.data);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [fileId]);

    // Post um das file ans Backend schicken erst hochladen durch input.
    const postInputedFile = async () => {
        if (fileInput) {
            const formData = new FormData();
            formData.append("file", fileInput);
            formData.append("headline", "dasIstDieHeadline");

            const response = await axios.post("/api/files", formData);
            onUpload(response.data);
            setFile(response.data)
            onUpload2();

            if (!file) {
                return null;
            }
            onUpload(file);

            alert(JSON.stringify(response.data, null, 2));

        } else {
            console.log("kein file gefunden");
        }
    };

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target;
            setHeadline(value);

            console.log("handleChange-value ", value);
        }, [setHeadline]);

    return (
        <Stack display={"flex"} flexDirection={"column"} alignItems={"center"}>

            <Stack width="100%" sx={{position: "relative"}}>

                <Container sx={{
                    height: 0,
                    overflow: "hidden",
                    paddingTop: "100%",
                    position: "relative",
                    border: "1px solid grey",
                    borderRadius: 1
                }}>
                    {file
                        ? (file) && <img src={"/api/files/" + file.id} alt="preview" style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        objectFit: "cover",
                        width: "100%",
                        height: "100%"
                    }}
                    />
                        : <Skeleton variant="rectangular" animation={"wave"} width="100%" height="100%" sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}/>
                    }
                </Container>

                <IconButton size="large" aria-label="upload image" component="label" onClick={() => {
                    fileInputRef.current?.click()
                }} sx={{
                    display: "block",
                    m: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1
                }}>
                    <PhotoCameraIcon sx={{width: "30%", height: "100%"}}/>
                </IconButton>
            </Stack>

            <input
                required
                ref={fileInputRef}
                style={{display: "none"}}
                type={"file"}
                onChange={(e) => {
                    // FILE CHANGE
                    if (!e.target.files || e.target.files.length < 1) {
                        setFileInput(null);
                        return;
                    }
                    setFileInput(e.target.files[0]);
                }}
                accept={"image/png"}
            />
            <TextField
                required
                label="HeadLine"
                onChange={handleChange}
                sx={{width: 200}}
                variant="standard"
                inputProps={{style: {textAlign: 'center'}}}
                margin={"none"}
            />
            <Button onClick={postInputedFile}>Post</Button>
        </Stack>
    );
}

//value={(file)&&file.headline}

//{(file)&&(!file.headline) && <PhotoCameraIcon sx={{width: "30%", height: "100%"}} />}