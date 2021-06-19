/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Flags {
}

export interface Flags2 {
}

export interface Flags3 {
    isConst?: boolean;
    isPublic: boolean,
    isExternal: boolean,
    isReadonly: boolean
    isStatic: boolean
    isRest: boolean
    isPrivate: boolean
}

export interface Source {
    fileName: string;
    line: number;
    character: number;
}

export interface Flags4 {
}

export interface Type {
    type: string;
    name: string;
}

export interface Flags5 {
}

export interface TypeParameter {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags5;
}

export interface Flags6 {
}

export interface Type2 {
    type: string;
    name: string;
}

export interface Parameter {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags6;
    type: Type2;
}

export interface Signature {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags4;
    type: Type;
    typeParameter: TypeParameter[];
    parameters: Parameter[];
}

export interface Flags7 {
    isPublic?: boolean;
    isExternal?: boolean;
    isReadonly?: boolean;
    isStatic?: boolean;
    isOptional?: boolean;
}

export interface Flags8 {
    isExternal?: boolean;
}

export interface Flags9 {
    isExternal?: boolean;
    isRest?: boolean;
    isOptional?: boolean;
}

export interface ElementType2 {
    type: string;
    name: string;
}

export interface ElementType {
    type: string;
    name: string;
    elementType: ElementType2;
}

export interface Type4 {
    type: string;
    name: string;
    elementType: ElementType;
}

export interface Flags10 {
    isExternal: boolean;
}

export interface Flags11 {
    isExternal: boolean;
}

export interface Flags12 {
    isExternal: boolean;
    isRest: boolean;
}

export interface ElementType3 {
    type: string;
    name: string;
}

export interface IndexType {
    type: string;
    name: string;
}

export interface ObjectType {
    type: string;
    name: string;
}

export interface Type5 {
    type: string;
    elementType: ElementType3;
    indexType: IndexType;
    objectType: ObjectType;
}

export interface Parameter3 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags12;
    type: Type5;
}

export interface TypeArgument {
    type: string;
    name: string;
}

export interface Type6 {
    type: string;
    name: string;
    typeArguments: TypeArgument[];
}

export interface Signature3 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags11;
    parameters: Parameter3[];
    type: Type6;
}

export interface Declaration {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags10;
    signatures: Signature3[];
}

export interface IndexType2 {
    type: string;
    name: string;
}

export interface ObjectType2 {
    type: string;
    name: string;
}

export interface Target {
    type: string;
    name: string;
}

export interface TypeArgument2 {
    type: string;
    name: string;
    operator: string;
    target: Target;
}

export interface Type7 {
    type: string;
    name: string;
}

export interface ElementType4 {
    type: string;
    name: string;
    types: Type7[];
}

export interface Type3 {
    type: string;
    name: string;
    types: Type4[];
    declaration: Declaration;
    indexType: IndexType2;
    objectType: ObjectType2;
    typeArguments: TypeArgument2[];
    elementType: ElementType4;
    head: string;
    tail: any[][];
    id?: number;
}

export interface Comment {
    text: string;
}

export interface Parameter2 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags9;
    type: Type3;
    comment: Comment;
}

export interface Type9 {
    type: string;
    name: string;
}

export interface TypeArgument3 {
    type: string;
    name: string;
}

export interface ElementType5 {
    type: string;
    types: Type9[];
    name: string;
    typeArguments: TypeArgument3[];
}

export interface TypeArgument5 {
    type: string;
    name: string;
}

export interface ElementType6 {
    type: string;
    name: string;
}

export interface TypeArgument4 {
    type: string;
    name: string;
    typeArguments: TypeArgument5[];
    elementType: ElementType6;
}

export interface Type8 {
    type: string;
    id: number;
    name: string;
    elementType: ElementType5;
    typeArguments: TypeArgument4[];
}

export interface Overwrites {
    type: string;
    name: string;
}

export interface InheritedFrom {
    type: string;
    name: string;
}

export interface Flags13 {
    isExternal: boolean;
}

export interface Target2 {
    type: string;
    name: string;
}

export interface Type11 {
    type: string;
    name: string;
}

export interface Type10 {
    type: string;
    operator: string;
    target: Target2;
    types: Type11[];
}

export interface TypeParameter2 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags13;
    type: Type10;
}

export interface Tag {
    tag: string;
    text: string;
}

export interface Comment2 {
    shortText: string;
    tags: Tag[];
    returns: string;
}

export interface Signature2 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags8;
    parameters: Parameter2[];
    type: Type8;
    overwrites: Overwrites;
    inheritedFrom: InheritedFrom;
    typeParameter: TypeParameter2[];
    comment: Comment2;
}

export interface Overwrites2 {
    type: string;
    name: string;
}

export interface Source2 {
    fileName: string;
    line: number;
    character: number;
}

export interface Type13 {
    type: string;
    value?: any;
    name: string;
}

export interface QueryType {
    type: string;
    id: number;
    name: string;
}

export interface Type14 {
    type: string;
    name: string;
}

export interface ElementType7 {
    type: string;
    name: string;
    types: Type14[];
}

export interface Flags14 {
}

export interface Flags15 {
}

export interface Flags16 {
}

export interface ElementType8 {
    type: string;
    name: string;
}

export interface Type15 {
    type: string;
    name: string;
    elementType: ElementType8;
}

export interface Parameter4 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags16;
    type: Type15;
}

export interface Type16 {
    type: string;
    name: string;
}

export interface Signature4 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags15;
    parameters: Parameter4[];
    type: Type16;
}

export interface Declaration2 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags14;
    signatures: Signature4[];
}

export interface Type12 {
    type: string;
    types: Type13[];
    name: string;
    queryType: QueryType;
    elementType: ElementType7;
    declaration: Declaration2;
    id?: number;
}

export interface InheritedFrom2 {
    type: string;
    name: string;
}

export interface Tag2 {
    tag: string;
    text: string;
}

export interface Comment3 {
    shortText: string;
    text: string;
    tags: Tag2[];
}

export interface Child3 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags7;
    signatures: Signature2[];
    overwrites: Overwrites2;
    sources: Source2[];
    type: Type12;
    inheritedFrom: InheritedFrom2;
    comment: Comment3;
    defaultValue: string;
}

export interface Group {
    title: string;
    kind: number;
    children: number[];
}

export interface ExtendedType {
    type: string;
    name: string;
}

export interface Type17 {
    type: string;
    id: number;
    name: string;
}

export interface Comment4 {
    shortText: string;
    text: string
    tags: [{
        tag: string
        text: string
    }]
}

export interface Child2 {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags3;
    sources: Source[];
    signatures: Signature[];
    children: Child3[];
    groups: Group[];
    extendedTypes: ExtendedType[];
    type: Type17;
    defaultValue: string;
    comment: Comment4;
}

export interface Group2 {
    title: string;
    kind: number;
    children: number[];
}

export interface Source3 {
    fileName: string;
    line: number;
    character: number;
}

export interface Child {
    id: number;
    name: string;
    kind: number;
    kindString: string;
    flags: Flags3;
    children: Child2[];
    groups: Group2[];
    sources: Source3[];
    comment: Comment4
}

export interface Group3 {
    title: string;
    kind: number;
    children: number[];
}

export interface RootObject {
    id: number;
    name: string;
    kind: number;
    flags: Flags;
    originalName: string;
    children: Child[];
    groups: Group3[];
}

export const allowedTypes = [ 'enumeration', 'class', 'function' ]