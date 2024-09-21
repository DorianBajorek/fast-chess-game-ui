import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.copyright}>
         {new Date().getFullYear()} FastChessGame. All rights reserved.
      </div>
    </footer>
  );
};

const styles = {
    footer: {
      backgroundColor: '#f9f9f9',
      padding: '20px 50px',
      borderTop: 'solid 1px #e5e5e5',
    },
    copyright: {
      textAlign: 'center' as 'center',
      fontSize: '0.85rem',
      color: '#999',
    },
  };
  

export default Footer;
