import './account.css';
import Icon from "../../icon/icon.jsx";
import useGlobalBxStore from '../../zustand/useGlobalBxStore.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const Accounts = () => {
  const { setBoxType, setIsVisible } = useGlobalBxStore();
  
  // State to track connected accounts (you might want to replace this with actual data from your backend)
  const [connectedAccounts, setConnectedAccounts] = useState({
    shopify: false,
    meta: false
  });

  const handleClick = (type) => {
    if (type === 'shopify') {
      console.log('connect to shopify');
      setIsVisible(true);
      setBoxType('connectionGuide');
      
    } else {
      toast.info('Oops! sorry this feature is not available.')
    }
  };

  const handleDisconnect = (type) => {
    console.log(`disconnect ${type}`);
    setConnectedAccounts({...connectedAccounts, [type]: false});
  };

  const fetchConnectedAccounts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/user/connection/status`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if(data.status== 'fail'){
        toast.error('Error in fetching connected accounts')
      }
      setConnectedAccounts(data.data);
    } catch (error) {
      toast.error('Error in fetching connected accounts');
      console.error('Error fetching connected accounts:', error);
    }

  }
  useEffect(()=>{
    fetchConnectedAccounts();
  },[])

  return (
    <div className='account-container'>
      <div className='account-content'>
        <section className='quick-overview'>
          <div className='account-header'>
            <h2>Account Integration</h2>
            <p>Easily connect your Shopify and Meta accounts to streamline product page creation and ad publishing.</p>
          </div>
        </section>
        
        <section className='account-panel'>
          {/* Shopify Account Item */}
          <div className='account-item'>
            <div className='account-name'>
              <div className='account-icon'><Icon icon='shopify'/></div>
              <div className='account-title-status'>
                <h3>Shopify</h3>
                <div className={`connection-status ${connectedAccounts.shopify ? 'connected' : 'disconnected'}`}>
                  {connectedAccounts.shopify ? 'Connected' : 'Not Connected'}
                </div>
              </div>
            </div>
            
            <p>Effortlessly connect your Shopify store to import and showcase products using our high-converting templates.</p>
            
            <div className='connect-feild'>
              {connectedAccounts.shopify ? (
                <div className="connection-actions">
                  <button 
                    className='disconnect-btn'
                    onClick={() => handleDisconnect('shopify')}
                  >
                    <Icon icon='unlink' />
                    <span>Disconnect</span>
                  </button>
                </div>
              ) : (
                <button 
                  className='connect-btn' 
                  onClick={() => handleClick('shopify')}
                >
                  <Icon icon='link' />
                  <span>Connect</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Meta Account Item */}
          <div className='account-item'>
            <div className='account-name'>
              <div className='account-icon'><Icon icon='meta'/></div>
              <div className='account-title-status'>
                <h3>Meta</h3>
                <div className={`connection-status ${connectedAccounts.meta ? 'connected' : 'disconnected'}`}>
                  {connectedAccounts.meta ? 'Connected' : 'Not Connected'}
                </div>
              </div>
            </div>
            
            <p>Easily connect your Meta account to create and publish ads directly from our platform.</p>
            
            <div className='connect-feild'>
              {connectedAccounts.meta ? (
                <div className="connection-actions">
  
                  <button 
                    className='disconnect-btn'
                    onClick={() => handleDisconnect('meta')}
                  >
                    <Icon icon='unlink' />
                    <span>Disconnect</span>
                  </button>
                </div>
              ) : (
                <button 
                  className='connect-btn' 
                  onClick={() => handleClick('meta')}
                >
                  <Icon icon='link' />
                  <span>Connect</span>
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Accounts;