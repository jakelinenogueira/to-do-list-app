import React from 'react';
import {render} from '@testing-library/react';
import Modal from './Modal';

describe('Testes Modal', () => {
    test('deve renderizar o modal com a mensagem', () => {
        const result = render(
          <Modal 
            message="Mensagem Teste" 
            onConfirm={() => {}} 
            onCancel={() => {}} 
          />
        );
      
        expect(result.getByText('Mensagem Teste')).toBeInTheDocument();
    });

    test('deve chamar a função onConfirm quando o botão de confirmar for clicado', () => {
        const onConfirm = jest.fn();
        const { getByText } = render(<Modal message="Mensagem Teste" onConfirm={onConfirm} onCancel={() => {}} />);
        
        getByText('Confirmar').click();
        
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    test('deve chamar a função onCancel quando o botão de cancelar for clicado', () => {
        const onCancel = jest.fn();
        const { getByText } = render(<Modal message="Mensagem Teste" onConfirm={() => {}} onCancel={onCancel} />);
        
        getByText('Cancelar').click();
        
        expect(onCancel).toHaveBeenCalledTimes(1);
    });
})