import React from 'react';
import {FirstLetters} from "../../utils/get-first-letters-by-login";

interface PseudoAvatar {
    firstname: string;
    lastname:string;
}

const colors = [
    "#53aedf",
    "#3D8DAE",
    "#76c3da",
    "#4a8edb",
    "#79b8d3",
    "#c54e4e",
    "#6e8ac9",
    "#4e89a2",
    "#848fd3",
    "#3D8DAE",
    "#74abda",
    "#3daeae",
    "#177d88",
    "#21b4c4",
    "#ff6e6e",
    "#DFA253FF",
    "#3788d8",
    "#d76d4d",
    "#ae3d86",
    "#e76d59",
    "#dfa253",
    "#db4a71",
    "#ce4fe1",
    "#dc9cbc",
    "#ae3d52",
    "#e07272",
];

const PseudoAvatar = ({firstname,lastname}: PseudoAvatar) => {
    return (
        <span style={{color:`#f4f6fa`,
            background:`${colors[Math.floor(Math.random()*colors.length)]}`,
            height:'100%',
            width:'100%',
            borderRadius:'50%',
            display:'flex',
            justifyContent:"center",
            alignItems:"center",
            fontWeight:'700',
            fontSize:"19px"
        }}>
            <span>{FirstLetters(firstname,lastname)}</span>
        </span>
    );
};

export default PseudoAvatar;