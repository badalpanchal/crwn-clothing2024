/* 
    Building custom button for reusable button with 3 diff parameters:
    
    regular (Black and white after hovered)
    inverted(white and Black after hovered)
    sign-in with Google(with blue background)
*/

import './custom-button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google:'google-sign-in',
    inverted:'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>{children}</button>
  );
}; 

export default Button;
