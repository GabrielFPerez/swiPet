import React from 'react';

const PetCard = ({ card, onDiscard, onFavorite, showButtons = true }) => {
    
    const app_name = ''
    
    return (
        
        
        
        
        <div className="card">
            <div className='left-side'>
                <div className='images'>
                {card["Pet Images"] && card["Pet Images"].map((url, index) => (
                    <img key={index} src={url} alt={`Pet image ${index + 1}`} />
                ))}

                </div>
                
                <div className='pet-info'>

                </div>

            </div>
            <div className='right-side'>
                <div className='pet-name'>

                </div>

                <div className='pet-story'>

                </div>
                
            </div>

            {showButtons && (
                <div>
                <button onClick={onDiscard}>X</button>
                <button onClick={onFavorite}>❤️</button>
                </div>
            )}
        </div>
    );
};

export default PetCard;