import React from 'react';
import { PlantInfo as PlantInfoType } from '../../services/dummyData';
import images from '../../assets/images';
import './PlantInfo.css';

interface PlantInfoProps {
  plantInfo: PlantInfoType;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ plantInfo }) => {
  return (
    <div className="plant-info">
      <div className="plant-image-container">
        <img src={images.frame.plant} alt={plantInfo.name} className="plant-image" />
      </div>
    </div>
  );
};

export default PlantInfo;
