// CatItem is a child component of the app

import React from 'react';
import { Cat } from './demo';

interface Props {
    cat: Cat;
}

export default function CatItem({cat}: Props) {
    return (
        <div key={cat.name}>
        <span>{cat.name}</span>
        <button onClick={() => cat.makeSound(cat.name + ' meow')}>Make sound</button>
      </div>
    )
}