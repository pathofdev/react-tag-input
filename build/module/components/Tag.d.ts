import React from "react";
interface Props {
    value: string;
    index: number;
    editable: boolean;
    readOnly: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    update: (i: number, value: string) => void;
    remove: (i: number) => void;
    validator?: (val: string) => boolean;
    removeOnBackspace?: boolean;
}
export declare class Tag extends React.Component<Props> {
    innerEditableRef: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void;
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean;
    remove: () => void;
    render(): JSX.Element;
}
export {};
