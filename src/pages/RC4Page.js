// src/pages/RC4Page.js
import React from 'react';
import {Grow} from "@mui/material";
import CipherForm from "../components/CipherForm";
import RC4_Form from "../components/RC4_Form";
function RC4Page() {
    return (
        <Grow in={true} timeout={1000}>
            <div>
                <RC4_Form />
            </div>
        </Grow>
    );
}

export default RC4Page;
