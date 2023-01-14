import React from 'react';
import { UserallState } from '../hooks/useContext';
import { motion } from 'framer-motion';

const PreviewImg = () => {
  const { url, setActivePrevBox } = UserallState();
  return (
    <div className="imageFileCom" onClick={() => setActivePrevBox(false)}>
      <motion.div
        animate={{
          y: 120,
        }}
        className="previeweImg"
      >
        <img src={url} alt="preview img"></img>
      </motion.div>
    </div>
  );
};

export default PreviewImg;
