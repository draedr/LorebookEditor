import { Title, Text } from '@mantine/core';

export default function AboutPage() {
    return (
        <div className="p-4">
            <Title mb={8} order={2}>About</Title>
            <Text size="md" py="1">
                Hi, this is a lorebook editor for SillyTavern's worlds. I've made this because for some reason the section in SillyTavern always gets really slow, really quickly. 
                Not all fields and functions are available at the moment, as it's mainly though for adding entries and content.
            </Text>
        </div>
    );
}