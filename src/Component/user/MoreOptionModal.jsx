import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../Axios/axios';

const MoreOptionsModal = React.memo(({ isOpen, onClose, postOwner }) => {

console.log(postOwner,'iddddssssdddaaaaaaaaaaaaaadddd');

const [isFollowing, setIsFollowing] = useState(false);

const userId = useSelector((store) => store.user?.userData?.payload?.userId);
const friendId=postOwner._id

const handleToggleFollow = async () => {
    try {
      // Perform the follow or unfollow action based on the current state
      if (isFollowing) {
        console.log("unfollow");
        try {
            
            await axios.put(`/${userId}/unfollow`, { id: friendId }).then((res) => {
              console.log(res?.data,"unfollowww");
             
            });
          } catch (error) {
            console.error("Error unfollowing user:", error);
            
          }
      } else {
        console.log('follow');
        try {
            
            await axios.put(`/${userId}/follow`, { id: friendId }).then((res) => {
      
             console.log(res.data?.details,"folollowwwwwers");
              
            });
          } catch (error) {
            console.error("Error following user:", error);
            
          }
      }

      // Toggle the follow state
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

useEffect(() => {
    // Check if the current user is in the followers array
    setIsFollowing(postOwner?.followers?.includes(userId));
  }, [postOwner, userId]);

  const modalStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#030712',
    padding: '20px',
    color: 'white',
    zIndex: 999,
    borderRadius: '10px', // Set the border radius for curvature
    border: '2px solid #155e75',
    textAlign:'center',
    width:'200px'
  };
  const backdropStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: isOpen ? 'block' : 'none',
    zIndex: 998, // below the modal (999) but above the content (1)
  };

  const buttonStyle = {
    color: 'white',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  const hoverColor = '#f0f0f0';

  return (
    <div style={{ width: '100%' }}>
      <div style={backdropStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <div>
            <div style={{ position: 'absolute',top:'3px',right:'3px'}}>
          <button
            style={{ ...buttonStyle, float: 'right',paddingBottom:'18px' }}
            onClick={onClose}
            >
            <img src='/assets/cross.png' alt="Close" style={{ width: '15px', height: '15px' }} />
          </button>
              </div>
          <div style={{ width: '100%' }}>
          {postOwner?._id !== userId && (
             <>
          <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
            >
              About this account
            </button>
            <hr style={{ border: '1px solid #155e75', margin: '8px 0', width: '100%', }} /> 
         
              <button style={buttonStyle} onClick={handleToggleFollow}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            <hr style={{ border: '1px solid #155e75', margin: '8px 0', width: '100%' }} />
            
            <button style={buttonStyle}>Report</button>
            <hr style={{ border: '1px solid #155e75', margin: '8px 0', width: '100%' }} />
                </>
            )}
            <div>
            {postOwner && postOwner._id === userId && (
                <>
                  <button style={buttonStyle}>Edit</button>
                  <hr style={{ border: '1px solid #155e75', margin: '8px 0', width: '100%' }} />
                  <button style={buttonStyle}>Delete</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MoreOptionsModal;
