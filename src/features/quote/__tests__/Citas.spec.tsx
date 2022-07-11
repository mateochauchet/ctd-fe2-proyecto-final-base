import Cita from '../Cita';
import {  screen, fireEvent, waitFor, getByText } from '@testing-library/react'
import { renderRedux } from '../../../test/utils';
import {setupServer} from 'msw/node'
import { response, rest } from 'msw'
import { API_URL } from '../../../app/constants';

const responseeMock = {
    cita: "Eat my shorts",
    personaje: "Bart Simpson",
    imagen: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638",
    direccionPersonaje: "Right"
}

const handlers = [
    rest.get(`${API_URL}?character=bart`, (req, res, ctx) => {

        const quote:String = 'Eat my shorts';
        const mockRes = responseeMock;

        return res(ctx.json(mockRes));
    })
];

const server = setupServer( ...handlers )
// Establish API mocking before all tests.
beforeAll(()=>server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(()=> server.resetHandlers())
// Clean up after the tests are finished.
afterAll(()=> server.close())


describe("Test del componente Cita",()=>{

    test("should render",()=>{
        renderRedux(<Cita/>)
        const button = screen.getByRole('button', {name:/obtener cita aleatoria/i})
    })    
    
    test('testing case writting a character name ',async ()=> {
        renderRedux(<Cita/>)
        const button = screen.getByRole('button', {name:/obtener cita aleatoria/i});
        const input = screen.getByPlaceholderText(/ingresa el nombre del autor/i);
        const quoteText = screen.getByText(/no se encontro ninguna cita/i)
        
        fireEvent.change(input, { target: { value: 'homer' } });
        
        expect(button).toHaveTextContent(/obtener cita/i)
    })
    
    test('button "Borrar" functionality',()=>{
        renderRedux(<Cita/>)
        
        const buttonDelete = screen.getByRole('button', {name:/Borrar/i});
        const buttonSearch = screen.getByRole('button', {name:/obtener cita aleatoria/i});
        const input = screen.getByPlaceholderText(/ingresa el nombre del autor/i);
        
        fireEvent.change(input, { target: { value: 'homer' } });
        fireEvent.click(buttonSearch);
        fireEvent.click(buttonDelete);
        
        expect(input).toHaveValue('')
        expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument();

    })
    
    
    test('should show a loading state', ()=>{
        renderRedux(<Cita/>)
        
        const button = screen.getByRole('button', {name:/obtener cita aleatoria/i});
        const input = screen.getByPlaceholderText(/ingresa el nombre del autor/i);
        
        fireEvent.change(input, { target: { value: 'bart' } });
        fireEvent.click(button);
        
        expect(screen.getByText(/cargando.../i)).toBeInTheDocument();
        
    })
    
    test('should render the correct info', async () => {
        renderRedux(<Cita/>)
        const button = screen.getByRole('button', {name:/obtener cita aleatoria/i});
        const input = screen.getByPlaceholderText(/ingresa el nombre del autor/i);
        
        fireEvent.change(input, { target: { value: 'bart' } });
        fireEvent.click(button);

        const expectedQuote = await screen.findByText('Eat my shorts');


        expect(expectedQuote).toBeInTheDocument();
        screen.debug()

    })
    
    test('should handle the error', () => {

    })
})