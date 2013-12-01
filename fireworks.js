/**
 * Copyright (C) 2011 by Paul Lewis for CreativeJS. We love you all :)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

        //Paul Irish's requestAnimationFrame polyfill
        //http://www.paulirish.com/

        window.requestAnimFrame = (function(){
              return  window.requestAnimationFrame       ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame    ||
                      function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                      };
            })();

        //Based on the particle system fireworks demo from Paul Lewis
        //http://creativejs.com/tutorials/creating-fireworks/
        var Particle = function(pos, target, vel, marker, usePhysics) {
                  // properties for animation
                  // and colouring
                  this.GRAVITY  = 0.06;

                  this.pos = {
                    x: pos.x || 0,
                    y: pos.y || 0
                  };

                  this.vel = {
                    x: vel.x || 10,
                    y: vel.y || 10
                  };

                  this.lastPos = {
                    x: this.pos.x,
                    y: this.pos.y
                  };

                  this.target = {
                    y: 0
                  };

                  this.usePhysics = usePhysics || false;

            };
            Particle.prototype.move = function(){
                this.lastPos.x = this.pos.x;
                this.lastPos.y = this.pos.y;

                this.vel.y += this.GRAVITY;
                this.pos.y += this.vel.y;

                this.pos.x += this.vel.x;
            };
            Particle.prototype.setColor = function(c){
                var rand = Math.floor(Math.random() * 10);
                this.color = (rand % 2 == 0 ? c : "#FFFFFF");
            }
            
            window.onload = function(){
                var canvas = document.getElementById("dpad");
                    canvas.height = 1000;
                    canvas.width = 1000;
                var context = canvas.getContext("2d"),
                    index = 0,
                    imgIndex = 0,
                    boxes = {
                        n: [160, 650],
                        ne: [270, 650],
                        nw: [50, 650],
                        w: [50, 760],
                        c: [160, 760],
                        e: [270, 760],
                        sw: [50, 870],
                        s: [160, 870],
                        se: [270, 870],
                    },
                    imgArray = [
                    'images/a_nw.png',
                    'images/a_s.png',
                    'images/a_ne.png',
                    'images/a_left.png',
                    'images/a_s.png',
                    'images/a_e.png',
                    'images/a_sw.png',
                    'images/a_s.png',
                    'images/a_se.png'];  
                img = new Image();
                context.fillStyle="#000000";
                context.fillRect(35, 625, 350, 360);
                for(index=0; index<3;index++){
                    var img1 = new Image(),
                        img2 = new Image(),
                        img3 = new Image();
                    img1.src = imgArray[imgIndex++];
                    img1.setAtX = 50;
                    img1.setAtY = 650 + (110 * index);
                    img2.src = imgArray[imgIndex++];
                    img2.setAtX = 160;
                    img2.setAtY = 650 + (index * 110);
                    img3.src = imgArray[imgIndex++];
                    img3.setAtX = 270;
                    img3.setAtY = 650 + (index * 110);
                    img1.onload = function(){
                        context.drawImage(this, this.setAtX, this.setAtY);
                    };
                    img2.onload = function(){
                        context.drawImage(this, this.setAtX, this.setAtY);
                    };
                    img3.onload = function(){
                        context.drawImage(this, this.setAtX, this.setAtY);
                    };
                }

                context.fillStyle="#20a7d8";
                context.fillRect(500, 120, 400, 850);
                context.fillStyle="#000000";
                context.font = "bold 30px sans-serif";
                context.fillText("(Game Screen)", 600, 350);
                
                var click = function(e){
                    e.preventDefault();
                    var start = new Date(),
                        start_time = start.getTime();
                    console.log("Mouse position: x=" + (e.offsetX) + ", y=" + (e.offsetY));
                    var color = "";
                        for(var i = 0; i < 3; i++) {
                            var sub = Math.floor(100 + Math.random() * 156).toString(16);
                            color += (sub.length == 1 ? "0" + sub : sub);
                        }
                        var particles = [];
                        var count = 200;
                        var angle = (Math.PI * 2) / count;
                        while(count--) {
                         
                            var randomVelocity =  .1 + Math.random() * 5;
                            var particleAngle = count * angle;
                         
                            particles[200-count-1] = new Particle(
                                {x:e.offsetX, y:e.offsetY}, null,
                                {
                                x: Math.cos(particleAngle) * randomVelocity,
                                y: Math.sin(particleAngle) * randomVelocity
                                },'blue', true);
                            particles[200-count-1].setColor(color);
                          }
                        function loop() {
                            if(particles.length > 1){       
                              clear();
                              update();
                              draw();
                              queue();
                            }
                            else{
                                clear();
                            }
                        }

                        function clear() {
                          context.clearRect(490, 0, 500, canvas.height);
                          index = 0;
                          imgIndex = 0;
                          for(index=0; index<3;index++){
                                var img1 = new Image(),
                                    img2 = new Image(),
                                    img3 = new Image();
                                    img1.src = imgArray[imgIndex++];
                                    img1.setAtX = 50;
                                    img1.setAtY = 650 + (110 * index);
                                    img2.src = imgArray[imgIndex++];
                                    img2.setAtX = 160;
                                    img2.setAtY = 650 + (index * 110);
                                    img3.src = imgArray[imgIndex++];
                                    img3.setAtX = 270;
                                    img3.setAtY = 650 + (index * 110);
                                    img1.onload = function(){
                                        context.drawImage(this, this.setAtX, this.setAtY);
                                    };
                                    img2.onload = function(){
                                        context.drawImage(this, this.setAtX, this.setAtY);
                                    };
                                    img3.onload = function(){
                                        context.drawImage(this, this.setAtX, this.setAtY);
                                    };
                            }

                          context.fillStyle="#20a7d8";
                          context.fillRect(500, 120, 400, 850);
                          context.fillStyle="#000000";
                          context.font = "bold 30px sans-serif";
                          context.fillText("(Game Screen)", 600, 350);
                        }

                        function update() {
                          plotParticles();
                        }

                        function draw() {
                          drawParticles();
                        }

                        function queue() {
                             window.requestAnimFrame(loop);
                        }

                        function plotParticles(){
                              var currentParticles = [];
                              for (var i = 0; i < particles.length; i++) {
                                var particle = particles[i];
                                var pos = particle.pos;
                             
                                // If we're out of bounds, drop this particle and move on to the next
                                if (pos.x <= 500 || pos.x >= 900 || pos.y <= 120 || pos.y >= 970){
                                    continue;
                                } 
                                else{
                                     // Move our particles
                                particle.move();
                             
                                // Add this particle to the list of current particles
                                currentParticles.push(particle);
                              }
                             
                              // Update our global particles, clearing room for old particles to be collected   
                            }      
                            particles = currentParticles;
                        }

                    function drawParticles(){
                          for (var i = 0; i < particles.length; i++) {
                            context.fillStyle = particles[i].color;
                            var position = particles[i].pos;
                            context.fillRect(position.x, position.y, 4, 4);
                        }
                    }
                    loop();
                };
                canvas.addEventListener("mousedown", click, false);
           };
