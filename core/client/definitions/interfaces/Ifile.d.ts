import { NodeInterface } from '../interfaces';
export interface FileInterface extends NodeInterface {
    _value: string;
    _default_value: string;
    _options: {
        _allow_videos: boolean;
        _allow_images: boolean;
        _allow_documents: boolean;
        _additional_css_classes: string;
    };
}
