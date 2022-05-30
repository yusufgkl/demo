import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  mode!: boolean;
  toggleText: string = 'VUE 1'
  cartCount: number = 0

  @ViewChild('canvas')
  private canvasRef!: ElementRef
  camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  loader = new THREE.TextureLoader()
  // geometry = new THREE.BoxGeometry(2, 1, 2)
  geometry = new THREE.SphereGeometry(2.5, 32, 32)
  // material = new THREE.MeshPhongMaterial({ color: new THREE.Color("rgb(0, 40, 160)") })
  material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('assets/texture/earthlights1k.jpg') })
  cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material)
  renderer!: THREE.WebGLRenderer
  scene!: THREE.Scene

  rotSpeedX: number = 0.05
  rotSpeedY: number = 0.01
  size: number = 200

  nearClippingPane: number = 1
  farClippingPane: number = 1000

  cameraZ: number = 400;
  fieldOfView: number = 1

  isDragging: boolean = false

  previousMousePosition = {
    x: 0,
    y: 0
  };

  constructor(
    private r: Renderer2,
    private _cartService: CartService
  ) {
    this._cartService.cart.subscribe(val => {
      this.cartCount = val.length
      
    })
  }

  ngAfterViewInit(): void {
    this.createScene()
    this.startRenderingLoop()
  }

  ngOnInit(): void {
    this.mode = true;

    this.loader.load(
      '../../assets/texture/earthlights1k.jpg',
      (texture) => {
        // in this example we create the material when the texture is loaded
        const material = new THREE.MeshBasicMaterial({
          map: texture
        });
        return material
      },
      undefined,

      // onError callback
      (err) => {
        console.error('An error happened.');
      }
    )
  }

  createScene() {
    this.scene = new THREE.Scene()
    this.scene.background = null
    this.scene.add(this.cube)

    let aspectratio = this.getAspectRatio()
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectratio,
      this.nearClippingPane,
      this.farClippingPane
    )

    this.camera.position.z = this.cameraZ

    var light = new THREE.SpotLight(0xFFFFFF);
    light.position.set(0, 50, 0);

    var pointLight = new THREE.AmbientLight(0xffffff);
    pointLight.position.set(0, 50, 0);

    this.scene.add(light);
    this.scene.add(pointLight);

  }

  getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight
  }

  animateCube() {
    this.cube.rotation.x += this.rotSpeedX
    this.cube.rotation.y += this.rotSpeedY
    this.startRenderingLoop()
  }

  startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true })
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(this.getAspectRatio())
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
    this.renderer.render(this.scene, this.camera)
    const renderArea = this.renderer.domElement

    const toRadians = (angle: any) => {
      return angle * (Math.PI / 180);
    };

    const toDegrees = (angle: any) => {
      return angle * (180 / Math.PI);
    };

    renderArea.addEventListener('mousedown', (e) => {
      this.isDragging = true;
    });

    renderArea.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        
      }
      let deltaMove = {
        x: e.offsetX - this.previousMousePosition.x,
        y: e.offsetY - this.previousMousePosition.y
      };

      if (this.isDragging) {

        let deltaRotationQuaternion = new THREE.Quaternion().

          setFromEuler(
            new THREE.Euler(toRadians(deltaMove.y * 1), toRadians(deltaMove.x * 1), 0, 'XYZ')
          );

        this.cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.cube.quaternion);
      }

      this.previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      };

      this.renderer.render(this.scene, this.camera)

    });

    document.addEventListener('mouseup', (e) => {
      this.isDragging = false;
    });

  }

  toggle(){
    this.mode = !this.mode
    if (this.mode) this.toggleText = 'VUE 1'
    if (!this.mode) this.toggleText = 'VUE 2'
  }

}
