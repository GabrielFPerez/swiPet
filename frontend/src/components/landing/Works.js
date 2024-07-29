import React from 'react';
import './Works.css';
import PetCard from '../../components/PetCard';
import Search from '../../icons/TagsArea.png';
import Line from '../../icons/Lineeee.png';





const Works = () => {
    const sampleCat = {
        Pet_Name: "Whiskers",
        Images: [
          "uploads/whiskers_front.jpg",
          "uploads/whiskers_side.jpg",
          "uploads/whiskers_playing.jpg"
        ],
        Age: 2,
        Size: "Medium",
        Gender: "Female",
        AdoptionFee: 100,
        Location: "Portland, OR",
        Breed: "British Shorthair",
        Pet_Type: "Cat",
        Bio: "Meet Whiskers, a charming 2-year-old British Shorthair with a plush, silvery-gray coat. This sweet girl has captivating round eyes that seem to look right into your soul. Whiskers is calm and composed, making her an ideal companion for a quiet household. She enjoys gentle play sessions and curling up in warm, cozy spots. While she's not overly demanding, Whiskers appreciates gentle affection and will reward you with soft purrs and loyal companionship. She's litter-trained and would do well in an apartment or house with patient owners who can give her time to adjust to her new surroundings."
      }; 

    return(
      <div className='Works'>
        <span className='work-text'>How it Works</span>
        <span className='work-subtext'>Our easy-to-use interface takes the guess work out of finding your furry companion by basing suggestions from your preferences</span>
        
        <div className='srch-bar'>
          <img src={Search} alt="search bar sample"/>
          <br></br>
          <img src={Line} alt="Line bar sample"/>
        </div>
        
        <PetCard pet={sampleCat} isSample={true} />


          
      </div>
        
    );
};

export default Works;