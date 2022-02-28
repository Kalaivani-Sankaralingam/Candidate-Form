import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  private _piBtnClicked: any;

  private _activeAccordion: number = 1;

  setData(_piBtnClicked: any) {
    this._piBtnClicked = _piBtnClicked;
  }

  getData(): any {
    return this._piBtnClicked;
  }

  setActiveAccordion(_activeAccordion: number) {
    this._activeAccordion = _activeAccordion;
  }

  getActiveAccordion() {
    return this._activeAccordion;
  }
}
