
"Hi, this is a lorebook editor for SillyTavern's worlds. I've made this because for some reason the section in SillyTavern always gets really slow, really quickly. \n Not all fields and functions are available at the moment, as it's mainly though for adding entries and content.",
"If you have any suggestions or feedback, feel free to contact me via mail: mail@feline.space"

import { useContext } from 'react';
import { HooksContext } from '../hooks';

export default function AboutPage() {
    return (
        <div className="p-4">
            <h3 className="text-2xl font-bold">About</h3>
            <div className="py-1">
                Hi, this is a lorebook editor for SillyTavern's worlds. I've made this because for some reason the section in SillyTavern always gets really slow, really quickly. 
                Not all fields and functions are available at the moment, as it's mainly though for adding entries and content.
            </div>
            <div className="py-1">
                If you have any suggestions or feedback, feel free to contact me via mail: <a className="font-semibold underline" href="mailto:mail@felines.space">mail@felines.space</a> or over Discord at <b>kettlevoid</b>.
            </div>
        </div>
    );
}