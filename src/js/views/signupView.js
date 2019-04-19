import { elements } from '../base';

export const signupView = () => {
    const markup = `
    <br><i class="fas fa-key sbtn"></i><input type="password" name="pass" class="form" id="form-rpa" placeholder="reEnter password"><br>
    `;
    elements.signup.insertAdjacentHTML('afterend', markup);
};