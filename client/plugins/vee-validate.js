import { extend } from 'vee-validate';
import { 
    required,
    email,
    confirmed,
    min,
    max
} from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Campo obrigatorio'
});

// Add the email rule
extend('email', {
    ...email,
    message: 'E-mail não valido'
});

extend('confirmed', {
    ...confirmed,
    message: 'Senhas não coincidem'
});

extend('min', {
    ...min,
    message: 'Valor muito curto'
});

extend('max', {
    ...max,
    message: 'Valor muito comprido'
});